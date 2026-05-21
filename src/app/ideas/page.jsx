import IdeasContainer from "@/components/IdeasContainer";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";


export const metadata = {
  title: "Ideas | IdeaVault",
};
export default async function IdeasPage() {

// const {token}=await auth.api.getToken({

//     headers:await headers()
//   });

  const res = await fetch(



    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`,

    // {
    //       headers:{ authorization:`Bearer ${token}`}
    //     },

    {
      cache: "no-store",
    }

  );

  const ideas = await res.json();



  return (

    <IdeasContainer ideas={ideas} />

  );
}