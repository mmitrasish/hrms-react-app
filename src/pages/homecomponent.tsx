import * as React from "react";

interface IHomeState {}

export default class HomeComponent extends React.Component<{}, IHomeState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Hi This works</h1>
      </div>
    );
  }
}
