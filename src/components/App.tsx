import { useEffect } from "react";
import "./app.scss";
import { clockScene } from "../clock-scene";

export function App() {
  useEffect(() => {
    clockScene.start();
  }, []);

  return null;
}
