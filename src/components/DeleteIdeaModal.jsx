"use client";

import toast from "react-hot-toast";

import {
  AlertDialog,
  Button,
} from "@heroui/react";

export default function DeleteIdeaModal({

  deleteId,
  setDeleteId,
  ideas,
  setIdeas,
  session,
  router

}) {

  const handleDelete =
    async () => {

       if (!session?.user) {
    toast.error("Please Login First");
    router.push("/login");
    return;
  }

      try {

        const res =
          await fetch(

            `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${deleteId}`,

            {
              method:
                "DELETE",
            }
          );



        const data =
          await res.json();



        if (
          data.deletedCount > 0
        ) {

          toast.success(
            "Idea Deleted Successfully"
          );



          const remaining =
            ideas.filter(
              (idea) =>
                idea._id !==
                deleteId
            );



          setIdeas(
            remaining
          );

          setDeleteId(
            null
          );

        }

      } catch (error) {

        toast.error(
          "Delete Failed"
        );

      }
    };



  if (!deleteId)
    return null;



  return (

    <AlertDialog defaultOpen>

      <AlertDialog.Backdrop>

        <AlertDialog.Container>

          <AlertDialog.Dialog className="sm:max-w-[450px] rounded-3xl">

            <AlertDialog.CloseTrigger
              onClick={() =>
                setDeleteId(
                  null
                )
              }
            />



            <AlertDialog.Header>

              <AlertDialog.Icon status="danger" />



              <AlertDialog.Heading>

                Delete Idea Permanently?

              </AlertDialog.Heading>

            </AlertDialog.Header>



            <AlertDialog.Body>

              <p className="text-gray-500 leading-7">

                This action will permanently delete this startup idea.

              </p>

            </AlertDialog.Body>



            <AlertDialog.Footer>

              <Button
                variant="outline"
                onPress={() =>
                  setDeleteId(
                    null
                  )
                }
              >

                Cancel

              </Button>



              <Button
                color="danger"
                onPress={
                  handleDelete
                }
              >

                Delete

              </Button>

            </AlertDialog.Footer>

          </AlertDialog.Dialog>

        </AlertDialog.Container>

      </AlertDialog.Backdrop>

    </AlertDialog>
  );
}