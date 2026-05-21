"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"

import {
  AlertDialog,
  Button,
} from "@heroui/react";

export default function DeleteCommentModal({

  deleteId,
  setDeleteId,
  comments,
  setComments,

}) {

  const handleDelete =
    async () => {

      try {
        const{data:tokenData}=await authClient.token()
console.log(tokenData)

        const res =
          await fetch(

            `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${deleteId}`,

            {
              method:
                "DELETE",
headers: {
        'content-type':'application/json',
        authorization: `Bearer ${tokenData?.token}`,
      },

            }
          );



        const data =
          await res.json();



        if (
          data.deletedCount > 0
        ) {

          toast.success(
            "Comment Deleted"
          );



          const remaining =
            comments.filter(
              (item) =>
                item._id !==
                deleteId
            );



          setComments(
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



  return (

    <AlertDialog
      isOpen={!!deleteId}
      onOpenChange={() =>
        setDeleteId(null)
      }
    >

      <AlertDialog.Backdrop>

        <AlertDialog.Container placement="center">

          <AlertDialog.Dialog className="sm:max-w-[450px] rounded-3xl">

            <AlertDialog.CloseTrigger
              onClick={() =>
                setDeleteId(null)
              }
            />



            <AlertDialog.Header>

              <AlertDialog.Icon status="danger" />



              <AlertDialog.Heading>

                Delete Comment?

              </AlertDialog.Heading>

            </AlertDialog.Header>



            <AlertDialog.Body>

              <p className="text-gray-500 leading-7">

                This action cannot be undone.

              </p>

            </AlertDialog.Body>



            <AlertDialog.Footer>

              <Button
                variant="outline"
                onPress={() =>
                  setDeleteId(null)
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