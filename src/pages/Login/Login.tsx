import "./Login.css";
export default function Login(){
    return (
        <>
        <div className="login-container d-flex justify-content-center align-items-center">
  <div className="login-card p-4">
    <h2 id="login-title" className="text-center mb-4 homenaje-regular">LOGIN</h2>

    <form action="">
    <div className="mb-3">
      <label>Username or Email</label>
      <input className="form-control" type="text" />
    </div>

    <div className="mb-3">
      <label>Password</label>
      <input className="form-control" type="password" />
    </div>

    <div className="text-end">
      <button className="btn btn-success">LOGIN</button>
    </div>
    </form>
  </div>
</div>
        </>
    );
}