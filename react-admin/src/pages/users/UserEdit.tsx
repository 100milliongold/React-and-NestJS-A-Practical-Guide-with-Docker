import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";

export default function UserEdit() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    (async () => {
      const respones = await axios.get("roles");
      setRoles(respones.data);

      const { data } = await axios.get(`users/${id}`);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setRoleId(data.role.id);
    })();
  }, [id]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`users/${id}`, {
      first_name,
      last_name,
      email,
      role_id,
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/users" />;
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            defaultValue={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            defaultValue={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-control"
            value={role_id}
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles.map((r: Role) => (
              <option defaultValue={r.id} key={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
}
