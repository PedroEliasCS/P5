import { useState } from "react";

import QuadTree from "../components/QuadTree/QuadTree";

const HomePage: React.FC = () => {
  const [option, setOption] = useState<string>("QuadTree");
  const [component, setComponent] = useState<JSX.Element>(<QuadTree />);
  // const change;

  const selectComponent = (option: string) => {
    import(`../components/${option}`).then((module) => {
      const ComponentElement = module.default;
      setComponent(<ComponentElement />);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    switch (option) {
      case "Bolhas":
        selectComponent("Bolhas");
        break;

      case "Bolhinhas":
        selectComponent("Bolinhas");
        break;
      case "BolhasComunicacao":
        selectComponent("BolhasComunicacao");
        break;

      case "QuadTree":
        selectComponent("QuadTree");
        break;
      default:
        setComponent(<></>);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Select the element for show: </label>
          <select
            name="components"
            id="components"
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="Bolhas">Bubbles</option>
            <option value="Bolhinhas">Bubbles walking</option>
            <option value="BolhasComunicacao">Bubbles Comunication</option>
            <option value="QuadTree">Quad tree</option>
          </select>
          <></>
          <button type="submit">Show</button>
        </form>
        <br></br>
        <div>{component}</div>
      </div>
    </>
  );
};

export default HomePage;
