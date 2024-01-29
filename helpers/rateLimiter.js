import { NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { redisClient } from "./redisRateLimitConfig";

const rateLimitCountPerMinutes = {
    publicRoutesCount: 30,
    loggedOutAdminCount: 10,
    loggedInAdminCount: 60,
    loggedOutCompanyCount: 30,
    loggedInCompanyCount: 60,
    loggedOutStudentCount: 30,
    loggedInStudentCount: 60
}
const ratelimit =
{
    loggedOutAdmin: new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(rateLimitCountPerMinutes.loggedOutAdminCount, "60 s"),
        ephemeralCache: new Map(),
        analytics: true,
    }),
    loggedInAdmin: new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(rateLimitCountPerMinutes.loggedInAdminCount, "60 s"),
        ephemeralCache: new Map(),
        analytics: true,
    }),
    loggedOutCompany: new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(rateLimitCountPerMinutes.loggedOutCompanyCount, "60 s"),
        ephemeralCache: new Map(),
        analytics: true,
    }),
    loggedInCompany: new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(rateLimitCountPerMinutes.loggedInCompanyCount, "60 s"),
        ephemeralCache: new Map(),
        analytics: true,
    }),
    loggedOutStudent: new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(loggedOutStudentCount, "10 s"),
        ephemeralCache: new Map(),
        analytics: true,
    }),
    loggedInStudent: new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(loggedOutStudent, "10 s"),
        ephemeralCache: new Map(),
        analytics: true,
    }),
}

export async function rateLimiter(request, event) {
    try {
        // an identifier is a parameter on the basis of which we want to limit our request
        //  it can be an api endpoint, ip address or a userID

        const identifier = request.ip ?? "127.0.0.1";

        const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit-middleware-${identifier}`);
        // console.log(success);

        if (!success) {
            const response = NextResponse.json({ msg: "Too many request" }, { status: 429 });
            response.headers.set("X-RateLimit-Limit", limit.toString());
            response.headers.set("X-RateLimit-Remaining", remaining.toString());
            response.headers.set("X-RateLimit-Reset", reset.toString());
            return response;
        }
        return success;

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}