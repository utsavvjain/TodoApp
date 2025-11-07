import React from "react";
import { ITodoItem } from "../../../interfaces/ITodoItem";

type Props = {
  data: ITodoItem;
};

const TodoCardItem = ({ data }: Props) => (
  <>
    <h3 className="text-lg font-bold uppercase text-white/70">
      {data.title}
    </h3>
    <h5 className="text-base text-white">
      {data.description}
    </h5>
  </>
);

export default TodoCardItem;
