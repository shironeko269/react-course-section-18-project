import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';
function RootLayout() {

  const token = useLoaderData();
  const submit = useSubmit()

  useEffect(() => {
    if (!token) {
      return;
    } 

    if (token === "EXPIRED") {
      submit(null, { action: "/logout" , method:"POST"})
      return;
    }

    const duration = getTokenDuration();
    console.log(duration);

    setTimeout(() => {
      submit(null,{action:"/logout" , method: "POST"})
    }, duration);

  },[token,submit])

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
