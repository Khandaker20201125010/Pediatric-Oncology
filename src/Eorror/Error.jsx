import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="bg-red-500 text-white p-4  min-h-screen flex items-center justify-center text-center">
            <div>
                <h1 className='text-8xl mb-2 font-extrabold'>404</h1>
                <h2 className="text-xl font-bold">Something went wrong!</h2>
                <p>We encountered an error. Please try again later.</p>
                <Link to='/'>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Get Back</button>
                </Link>
            </div>
        </div>
    );
};

export default Error;
