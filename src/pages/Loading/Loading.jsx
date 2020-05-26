import React, { useEffect } from "react";
import styles from "./Loading.module.scss";

const Loading = () => {
  useEffect(() => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    const originX = canvas.width / 2;
    const originY = canvas.height / 2;
    const radians = { x: 0, y: 0 };
    const prev = {
      x: originX + Math.cos(radians.x) * ((canvas.width - 10) / 2),
      y: originY + Math.sin(radians.y) * ((canvas.height - 10) / 2)
    };
    const speed = 0.15;

    const update = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let x = originX + Math.cos(radians.x) * ((canvas.width - 10) / 2);
      let y = originY + Math.sin(radians.y) * ((canvas.height - 10) / 2);

      ctx.beginPath();
      ctx.strokeStyle = "#03b6fc";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      radians.x += speed / 2;
      radians.y += speed;
      prev.x = x;
      prev.y = y;

      requestAnimationFrame(update);
    };

    update();
  }, []);
  return (
    <div className={styles["container"]}>
      <Canvas width={300} height={100} />
    </div>
  );
};

const Canvas = React.memo(props => {
  return (
    <canvas id="canvas" width={props.width} height={props.height}></canvas>
  );
});

export default Loading;
