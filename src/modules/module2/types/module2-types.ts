import { LoadingState } from "@constants"
import { Module2Steps } from "../constants";

export type Module2StoreType = {
    loading: LoadingState;
    items: unknown[];
    step: Module2Steps;
}