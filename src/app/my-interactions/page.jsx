

import MyInteractionsContainer from "@/components/MyInteractionsContainer";

import { auth } from "@/lib/auth";

import { headers } from "next/headers";


export const metadata = {
  title: "My Interactions | IdeaVault",
};

export default async function MyInteractionsPage() {

  const {token}=await auth.api.getToken({

    headers:await headers()
  });

  console.log(token);


  // SESSION
  const session =
    await auth.api.getSession({

      headers:
        await headers(),

    });

  const userEmail =
    session?.user?.email;

  const res =
    await fetch(

      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-interactions/${userEmail}`,

       {
      headers:{ authorization:`Bearer ${token}`}
    },

      {
        cache: "no-store",
      }

    );

  const comments =
    await res.json();

  return (

    <MyInteractionsContainer
      initialComments={
        comments
      }
    />

  );
}