import {
    LoaderFunction,
    useLoaderData as rrUseLoaderData,
    useRouteLoaderData as rrUseRouteLoaderData,
} from 'react-router-dom';
import { DeferredData } from './defer';

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<ReturnType<TLoaderFn>> extends Response | infer D
    ? D extends DeferredData<infer TDeferred>
        ? TDeferred
        : D
    : never;
export const useLoaderData = rrUseLoaderData as <TLoaderFn extends LoaderFunction>() => LoaderData<TLoaderFn>;

export const useRouteLoaderData = rrUseRouteLoaderData as <TLoaderFn extends LoaderFunction>(
    routeId: string
) => LoaderData<TLoaderFn>;
