import { useEffect } from "react"
import { loadItems } from "./store";
import { useAppDispatch } from "@store";
import { useSelector } from "react-redux";
import { getModule2Step } from "@modules/module2";

export const Module1: React.FC = () => {
    const dispatch = useAppDispatch();
    const step = useSelector(getModule2Step);

    useEffect(() => {
        dispatch(loadItems(step));
    }, [step]);

    return <div>Module 1</div>
}