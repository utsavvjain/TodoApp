import React, { useState } from "react";
import { 
  Button, 
  Modal, 
  Input, 
  Textarea, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure 
} from "@nextui-org/react";
import { BiNotepad, BiSave, BiEdit } from "react-icons/bi";

import { ITodoItem } from "../../../interfaces/ITodoItem";
import Router from "next/router";

const TodoModal = ({ id, state, post }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openHandler = () => {
    onOpen();
  };
  
  const closeHandler = () => {
    onClose();
  };

  const postItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, description };
      await fetch(`/api/item/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      onClose();
      await Router.push("/");
    } catch (error) {}
  };

  const updateItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, description };
      await fetch(`/api/item/update/${id}`, {
        method: "UPDATE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      onClose();
      await Router.push("/");
    } catch (error) {}
  };

  return (
    <>
      <Button onPress={openHandler} color="primary" endContent={<BiNotepad />}>
        {post ? "Add Todo" : "Edit Todo"}
      </Button>
      <Modal 
        isOpen={isOpen} 
        onClose={closeHandler}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1">
                <BiNotepad />
                {post ? "Add Todo" : "Edit Todo"}
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Title"
                  variant="bordered"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Description"
                  variant="bordered"
                  fullWidth
                  minRows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => post ? postItem({} as React.SyntheticEvent) : updateItem({} as React.SyntheticEvent)}
                  isDisabled={!description || !title}
                  endContent={<BiSave />}
                >
                  {post ? "Add" : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodoModal;
