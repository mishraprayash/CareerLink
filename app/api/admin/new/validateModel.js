import Admin from "@/models/Admin";
import Company from "@/models/Company";
import Internship from "@/models/Internship";
import path from "path";
export const validateModel = (role) => {
    let dbModel;
    if (!["Admin", "Company", "Internship"].includes(role)) {
        return false;
    }
    if (role === "Admin")
        dbModel = Admin;
    else if (role === "Company")
        dbModel = Company;
    else
        dbModel = Internship;
    return dbModel;
}