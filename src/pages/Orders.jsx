import React from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';
import { OrdersList, ComplexPaginationContainer, SectionTitle } from '../components';

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      return redirect('/login');
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log({ error });
    }
    return null;
  };

const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination < 1) {
    return <SectionTitle text="please make an order" />
  }

  return <>
  <SectionTitle text="Your orders" />
  <OrdersList />
  <ComplexPaginationContainer />
  </>
};

export default Orders;
