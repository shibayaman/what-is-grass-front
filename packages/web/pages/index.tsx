import Link from 'next/link';
import GuestOnlyPage from '../components/GuestOnlyPage';
import Layout from '../components/Layout';
import Login from '../components/Login';

const IndexPage: React.FC = () => {
  return (
    <GuestOnlyPage redirectTo="/my-top">
      <Layout title="Home">
        <div className="h-screen p-10 bg-gradient-to-r from-green-200 to-orange-200">
          <div className="flex justify-evenly">
            <div className="relative">
              <p className="text-4xl">
                WhatIsGrassは
                <span className="text-5xl text-orange-600 whitespace-nowrap">
                  素晴らしい
                </span>
                サイトです
              </p>
              <p className="text-2xl opacity-30 absolute right-0 m-2">
                知らんけど
              </p>
            </div>
            <Login />
          </div>
        </div>
      </Layout>
    </GuestOnlyPage>
  );
};

export default IndexPage;
