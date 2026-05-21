"use client";

import toast from "react-hot-toast";

import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";

export default function UpdateIdeaModal({

   idea,
  ideas,
  setIdeas,
  session,
  router

}) {

  const handleUpdate = async (
    e,
    close
  ) => {

    e.preventDefault();

    if (!session?.user) {
  toast.error("Please Login First");
  router.push("/login");
  return;
}

    const formData =
      new FormData(
        e.currentTarget
      );



    const updatedIdea =
      Object.fromEntries(
        formData.entries()
      );



    try {

      const res = await fetch(

        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${idea._id}`,

        {

          method: "PATCH",

          headers: {
            "content-type":
              "application/json",
          },

          body: JSON.stringify(
            updatedIdea
          ),

        }

      );



      const data =
        await res.json();



      if (
        data.modifiedCount > 0 ||
        data.matchedCount > 0
      ) {

        toast.success(
          "Idea Updated Successfully"
        );



        const updatedIdeas =
          ideas.map((item) =>

            item._id ===
            idea._id

              ? {
                  ...item,
                  ...updatedIdea,
                }

              : item
          );



        setIdeas(updatedIdeas);

        close();

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

        Update

      </Button>



      <Modal.Backdrop>

        <Modal.Container placement="auto">

          <Modal.Dialog className="sm:max-w-2xl rounded-3xl">

            <Modal.CloseTrigger />



            <Modal.Header>

              <Modal.Heading className="text-3xl font-bold">

                Update Idea

              </Modal.Heading>

            </Modal.Header>



            <Modal.Body className="p-6">

              <Surface variant="default">

                <form
                  onSubmit={(e) =>
                    handleUpdate(
                      e,
                      () => {}
                    )
                  }
                  className="space-y-6 p-6"
                >

                  <TextField
                    defaultValue={
                      idea.title
                    }
                    name="title"
                    isRequired
                  >

                    <Label>
                      Idea Title
                    </Label>

                    <Input className="rounded-2xl" />

                    <FieldError />

                  </TextField>



                  <TextField
                    defaultValue={
                      idea.category
                    }
                    name="category"
                    isRequired
                  >

                    <Label>
                      Category
                    </Label>

                    <Input className="rounded-2xl" />

                    <FieldError />

                  </TextField>



                  <TextField
                    defaultValue={
                      idea.estimatedBudget
                    }
                    name="estimatedBudget"
                  >

                    <Label>
                      Estimated Budget
                    </Label>

                    <Input className="rounded-2xl" />

                    <FieldError />

                  </TextField>



                  <TextField
                    defaultValue={
                      idea.targetAudience
                    }
                    name="targetAudience"
                  >

                    <Label>
                      Target Audience
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