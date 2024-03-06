const Overview = ({userData}) => {
    return (
      <section className="bg-white p-4">
        <h2 className="bg-slate-300 text-center text-[2rem] font-bold m-4 shadow-sm shadow-black rounded">Welcome, {userData}!</h2>
        {/* Display other overview information as needed */}
      </section>
    );
  };
  
  export default Overview;
  