
// a simple way to create a custom hook

// import { useState, useEffect } from "react"
// export const useFetch = async (url) => {
//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async (url) => {
//             try {
//                 const response = await fetch(url);
//                 if (!response.ok) {
//                     throw new Error('Error fetching the data');
//                 }
//                 const data = await response.json();
//                 setData(data);
//                 setIsLoading(false);
//                 setError(null);
//             } catch (error) {
//                 setIsLoading(false);
//                 setError(error.message)
//             }

//         }
//         fetchData(url);
//     }, [url])

//     return { data, isLoading, error };
// }