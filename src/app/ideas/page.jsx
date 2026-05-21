import IdeasContainer from "@/components/IdeasContainer";



export const metadata = {
  title: "Ideas | IdeaVault",
};
export default async function IdeasPage() {



  const res = await fetch(



    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`,

   

    {
      cache: "no-store",
    }

  );

  const ideas = await res.json();



  return (

    <IdeasContainer ideas={ideas} />

  );
}