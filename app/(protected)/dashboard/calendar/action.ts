// import { auth } from "@/auth";
// import { apiUrl } from "@/auth.config";

// export const fetchCalendarData = async () => {
//   const session = await auth();
//   console.log(session)

//   if (session?.accessToken) {
//     const response = await fetch(`${apiUrl}api/events`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         accessToken: session.accessToken,
//       }),
//     });

//     const data = await response.json();
//     console.log(data);
//   }
// };