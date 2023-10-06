import Loader from "../loader/Loader";

function SomeComponent() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader />;
  }

  return <div>{}</div>;
}

export default SomeComponent;
