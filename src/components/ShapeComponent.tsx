import React from "react";

const ShapeComponent: React.FC = () => {
  // const getRandomImage = () => {
  //   const isSymmetrical = Math.random() < 0.5;
  //   const folder = isSymmetrical ? "symmetrical" : "asymmetrical";

  //   const imageFilenames = ["1.svg", "2.svg", "3.svg , 4.svg , 5.svg"];
  //   const randomIndex1 = Math.floor(Math.random() * imageFilenames.length);
  //   const randomIndex2 = (randomIndex1 + 1) % imageFilenames.length;

  //   return {
  //     image1: `/${folder}/${imageFilenames[randomIndex1]}`,
  //     image2: `/${folder}/${imageFilenames[randomIndex2]}`,
  //   };
  // };

  // const { image1, image2 } = getRandomImage();

  return (
    <div>
      {/* <div>
        <img src={image1} alt="Shape 1" />
      </div>
      <div>
        <img src={image2} alt="Shape 2" />
      </div> */}
    </div>
  );
};

export default ShapeComponent;
