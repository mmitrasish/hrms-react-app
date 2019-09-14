import * as React from "react";
interface ICardProp {
  title: string;
  body: number;
}

const Card: React.FC<ICardProp> = (props: ICardProp) => {
  return (
    <div className="rounded-lg shadow border py-3 px-4 d-flex">
      <div></div>
      <div className="ml-auto">
        <h2 className="font-weight-bolder text-right">{props.body}</h2>
        <h5 className="font-weight-normal text-right">{props.title}</h5>
      </div>
    </div>
  );
};
export default Card;
