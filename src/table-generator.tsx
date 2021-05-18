import React from "react";

import * as Utils from "./utils";
import * as Example from "./examples/index";

export default () => {
  const [content, setContent] = React.useState("");
  //const [jsContent, setJsContent] = React.useState([]);

  const onClick = () => {
    Utils.toExport(content);
  };

  const handleChange = (a: { target: { value: string } }) => {
    try {
      const content = a.target.value;
      setContent(content);
    } catch (err) {}
  };

  const loadExample = (exampleId: number) => {
    const jsContent = Example.load(exampleId);

    setContent(Utils.jsonBeautify(jsContent));
  };

  const renderNav = () => {
    const navs = [
      { id: 1, name: "user simple", fx: () => loadExample(1) },
      { id: 2, name: "user advanced", fx: () => loadExample(2) },
      { id: 3, name: "multi page", fx: () => loadExample(3) },
      { id: 4, name: "merge", fx: () => loadExample(4) },
    ];

    const toLine = (i: { id: number; fx: any; name: string }) => (
      <li key={i.id} className="nav-item">
        <button className="nav-link" onClick={i.fx}>
          Load example #{i.name}
        </button>
      </li>
    );

    return <ul className="nav">{navs.map(toLine)}</ul>;
  };

  return (
    <React.Fragment>
      <h1>Tabular Export</h1>
      <p>
        Turn <code>JSON</code> lists into Excel files (.xlsx).
      </p>

      {renderNav()}

      <div className="row">
        <div className="col-md-12">
          <textarea
            className="form-control"
            style={{ minWidth: "100%", height: "400px" }}
            placeholder={"insert your json here"}
            value={content}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" type="submit" onClick={onClick}>
            Download <i className="fa fa-file-excel" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
