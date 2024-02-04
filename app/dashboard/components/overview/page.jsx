const Overview = ({userData}) => {
    return (
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome, {userData}!</h2>
        {/* Display other overview information as needed */}
      </section>
    );
  };
  
  export default Overview;
  