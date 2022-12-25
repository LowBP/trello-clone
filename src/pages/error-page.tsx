import { useRouteError } from 'react-router-dom';
import './css/error-page.css'
interface Error {
    [key: string]: string
}
export default function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <div  className='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}