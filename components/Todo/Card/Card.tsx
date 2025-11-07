import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { Card, Button, CardHeader, CardBody, CardFooter, ButtonGroup } from "@nextui-org/react";
import { BiTrash, BiEdit } from "react-icons/bi";

import TodoCardItem from "./Card.Item";
import { ITodoItem } from "../../../interfaces/ITodoItem";
import TodoModal from "../Modal/Modal";

type Props = {
  items: ITodoItem[];
};

async function deleteItem(id: number): Promise<void> {
  await fetch(`/api/item/delete/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

const TodoCard = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card 
          key={item.id} 
          isHoverable 
          shadow="lg" 
          className="relative"
        >
          <CardHeader className="absolute z-10 top-1 bg-black/40">
            <div>
              <TodoCardItem data={item}></TodoCardItem>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <img
              src="/background.jpg"
              alt="Card image background"
              className="object-cover w-full h-[340px]"
            />
          </CardBody>
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex gap-2">
              <ButtonGroup>
                {/* <Button
                  onClick={() =>
                    updateItem(item.id, item.title, item.description)
                  }
                  isIconOnly
                  variant="flat"
                  color="primary"
                >
                  <BiEdit size="20px" />
                </Button> */}
                <Button
                  onClick={() => deleteItem(item.id)}
                  isIconOnly
                  variant="flat"
                  color="danger"
                >
                  <BiTrash size="20px" />
                </Button>
              </ButtonGroup>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TodoCard;
