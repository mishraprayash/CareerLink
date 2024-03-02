import Image from "next/image";

function CareerGuide() {
    return ( 
        <div className="container mx-auto px-4">
            
            <h1 className="text-2xl font-bold my-8">Explore Articles</h1>
            <div className="flex justify-around">
                <div className="border rounded-lg overflow-hidden w-72">
                    <Image src='/image/resume_article.avif' width={400} height={400} />
                    <a href="https://www.indeed.com/career-advice/resumes-cover-letters/energy-engineer-resume" target="_blank">
                        <h2 className="text-lg font-semibold py-4 px-6">How To Write an Energy Engineer Resume (With Example)</h2>
                    </a>
                </div>
                <div className="border rounded-lg overflow-hidden w-72">
                    <Image src='/image/article.avif' width={400} height={400} />
                    <a href="https://www.indeed.com/career-advice/resume-samples/product-engineer" target="_blank">
                        <h2 className="text-lg font-semibold py-4 px-6">Product Engineer Resume Examples and Template for 2024</h2>
                    </a>
                </div>
                <div className="border rounded-lg overflow-hidden w-72">
                    <Image src='/image/written_article.avif' width={400} height={400} />
                    <a href="https://www.indeed.com/career-advice/resumes-cover-letters/creative-engineer-resume" target="_blank">
                        <h2 className="text-lg font-semibold py-4 px-6">How To Write a Creative Engineer Resume (With Example)</h2>
                    </a>
                </div>
            </div>
            <div className="flex justify-around my-8">
                <div className="border rounded-lg overflow-hidden w-72">
                    <Image src='/image/career.webp' width={400} height={400} />
                    <a href="https://setmycareer.com/blog/what-is-career-development.php" target="_blank">
                        <h2 className="text-lg font-semibold py-4 px-6">What is Career Development?</h2>
                    </a>
                </div>
                <div className="border rounded-lg overflow-hidden w-72">
                    <Image src='/image/engineering.webp' width={400} height={400} />
                    <a href="https://setmycareer.com/blog/career-guidance-for-engineering-students.php" target="_blank">
                        <h2 className="text-lg font-semibold py-4 px-6">Career Guidance for Engineering Students</h2>
                    </a>
                </div>
                <div className="border rounded-lg overflow-hidden w-72">
                    <Image src='/image/written_article.avif' width={400} height={400} />
                    <a href="https://www.mygreatlearning.com/blog/career-options-after-computer-engineering/" target="_blank">
                        <h2 className="text-lg font-semibold py-4 px-6">Career Options After Computer Engineering</h2>
                    </a>
                </div>
            </div>
            
        </div>
    );
}

export default CareerGuide;
