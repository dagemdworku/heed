import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface ErrorPageProps {}

const ErrorPage: FunctionComponent<ErrorPageProps> = () => {
  return (
    <div className="flex flex-col min-h-full pt-16 pb-12 bg-bg-l dark:bg-bg-d">
      <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-center flex-shrink-0">
          <Link to={`/`} className="inline-flex hover:opacity-80">
            {" "}
            <span className="sr-only">Logo</span>
            <img className="w-auto h-12" src="/vite.svg" alt="" />
          </Link>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide uppercase text-p">
              404 error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-fg-l dark:text-fg-d sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-2 text-base text-fg-l-s dark:text-fg-d-s">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-6">
              <Link
                to={`/`}
                className="text-base font-medium text-p hover:opacity-80"
              >
                Go back home<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <a
            href="#"
            className="text-sm font-medium text-fg-l-s dark:text-fg-d-s hover:text-fg-l-s-i dark:hover:text-fg-d-s-i"
          >
            Contact Support
          </a>
          <span
            className="inline-block border-l border-gray-300"
            aria-hidden="true"
          />
          <a
            href="#"
            className="text-sm font-medium text-fg-l-s dark:text-fg-d-s hover:text-fg-l-s-i dark:hover:text-fg-d-s-i"
          >
            Status
          </a>
          <span
            className="inline-block border-l border-gray-300"
            aria-hidden="true"
          />
          <a
            href="#"
            className="text-sm font-medium text-fg-l-s dark:text-fg-d-s hover:text-fg-l-s-i dark:hover:text-fg-d-s-i"
          >
            Twitter
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default ErrorPage;
