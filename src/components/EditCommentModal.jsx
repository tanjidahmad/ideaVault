"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";

export default function EditCommentModal({

  comment,
  comments,
  setComments,

}) {

  const handleUpdate =
    async (e) => {

      e.preventDefault();

      const formData =
        new FormData(
          e.currentTarget
        );



      const updatedComment =
        {
          comment:
            formData.get(
              "comment"
            ),
        };



      try {
        const{data:tokenData}=await authClient.token()
console.log(tokenData)

        const res =
          await fetch(

            `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${comment._id}`,

            {

              method:
                "PATCH",

              headers: {
                "content-type":
                  "application/json",
                   authorization: `Bearer ${tokenData?.token}`,
              },

              body: JSON.stringify(
                updatedComment
              ),

            }
          );



        const data =
          await res.json();

          console.log(res.status)



        if (
          data.modifiedCount >
            0 ||
          data.matchedCount >
            0
        ) {

          toast.success(
            "Comment Updated"
          );



          const updated =
            comments.map(
              (item) =>

                item._id ===
                comment._id

                  ? {
                      ...item,
                      ...updatedComment,
                    }

                  : item
            );



          setComments(
            updated
          );

        }

      } catch (error) {

        toast.error(
          "Update Failed"
        );

      }
    };



  return (

    <Modal>

      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-medium duration-300">

        Edit

      </Button>



      <Modal.Backdrop>

        <Modal.Container placement="auto">

          <Modal.Dialog className="sm:max-w-xl rounded-3xl">

            <Modal.CloseTrigger />



            <Modal.Header>

              <Modal.Heading className="text-2xl font-bold">

                Edit Comment

              </Modal.Heading>

            </Modal.Header>



            <Modal.Body className="p-6">

              <Surface variant="default">

                <form
                  onSubmit={
                    handleUpdate
                  }
                  className="p-6 space-y-6"
                >

                  <TextField
                    defaultValue={
                      comment.comment
                    }
                    name="comment"
                    isRequired
                  >

                    <Label>
                      Comment
                    </Label>

                    <Input className="rounded-2xl" />

                    <FieldError />

                  </TextField>



                  <Button
                    type="submit"
                    color="primary"
                    className="w-full"
                  >

                    Save Changes

                  </Button>

                </form>

              </Surface>

            </Modal.Body>

          </Modal.Dialog>

        </Modal.Container>

      </Modal.Backdrop>

    </Modal>
  );
}