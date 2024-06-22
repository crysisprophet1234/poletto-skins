import { useRouteError } from "react-router-dom"

export default function ErrorPage() {

    const error = useRouteError()
    console.error(error)

    const isError = (err: unknown): err is Error => {
        return err instanceof Error
    }

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>React Router default Error Page provided in the documentation https://reactrouter.com/en/main/start/tutorial</p>
            <p>
                <i>{isError(error) ? error.message : 'Unknown error'}</i>
            </p>
        </div>
    )
}