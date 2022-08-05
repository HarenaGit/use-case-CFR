import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Footer from '../component/footer';
import sampleData from "../samples/transport-etech.json";

const VehiculesInputs = ({ item }) => {
  const {
    startLocation,
    endLocation,
    registre,
    finishWork,
    numberOfPlace
  } = item;
  return (
    <div
      style={{
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 50,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#ccc"
      }}
    >
      <input
        style={{ marginBottom: 15 }}
        type="text"
        placeholder="immatriculation"
        value={registre}
      />
      <input
        style={{ marginBottom: 15 }}
        type="number"
        placeholder="Nombre de places"
        value={numberOfPlace}
      />
      <p>Heure de debut de travail du conducteur : </p>
      <input style={{ marginBottom: 15 }} type="time" placeholder="" />
      <p>Heure de fin de travail du conducteur : </p>
      <input style={{ marginBottom: 15 }} type="time" placeholder="" />
      <div style={{ display: "flex", marginBottom: 5 }}>
        <p>Emplacement de depart : </p>
        <input
          type="text"
          style={{ marginLeft: 15 }}
          placeholder="latitude..."
          value={startLocation.latitude}
        />
        <input
          type="text"
          style={{ marginLeft: 15 }}
          placeholder="longitude..."
          value={startLocation.longitude}
        />
      </div>
      <div style={{ display: "flex" }}>
        <p>Emplacement de d'arrive : </p>
        <input
          style={{ marginLeft: 15 }}
          type="text"
          placeholder="latitude..."
          value={endLocation.latitude}
        />
        <input
          style={{ marginLeft: 15 }}
          type="text"
          placeholder="longitude..."
          value={endLocation.longitude}
        />
      </div>
      <button className="text-color-red">supprimer</button>
    </div>
  );
};

const ShipmentsInputs = () => {
  return (
    <div
      style={{
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 50,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#ccc"
      }}
    >
      <div style={{ display: "flex", marginBottom: 10 }}>
        <p>Id : </p>
        <input type="text" placeholder="shipmentId" />
      </div>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <p>Ramassage : </p>
        <input style={{ marginLeft: 30 }} type="text" placeholder="Latitude" />
        <input style={{ marginLeft: 30 }} type="text" placeholder="Longitude" />
      </div>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <p>Remisage : </p>
        <input style={{ marginLeft: 30 }} type="text" placeholder="Latitude" />
        <input style={{ marginLeft: 30 }} type="text" placeholder="Longitude" />
      </div>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <p>Nombre d'employes : </p>
        <input type="text" placeholder="Nombre d'employe a prendre/livrer" />
      </div>
      <div style={{ dipslay: "flex" }}>
        <button className="text-color-red">supprimer</button>
      </div>
    </div>
  );
};

function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}

const Main = () => {
  const [data, setData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [radiusGeoPoint, setRadiusGeoPoint] = useState("5000");
  const [planningDate, setPlanningDate] = useState(new Date());
  const [startEmployeWork, setStartEmployeWork] = useState("");
  const [endEmployeWork, setEndEmployeWork] = useState("");
  const [considerTimeByTrafic, setConsiderTimeByTrafic] = useState(true);
  const [fuelPrice, setFuelPrice] = useState("");
  const [vehicules, setVehicules] = useState([]);
  const onChangeSample = (e) => {
    const { value } = e.target;
    if (value === "transport-etech-test") {
      setData(sampleData);
    } else {
      setData({});
    }
  };

  useEffect(() => {
    setCompanyInfo({
      adresse: data.company ? data.company.adresse : "",
      latitude: data.company ? data.company.latitude : "",
      longitude: data.company ? data.company.longitude : ""
    });
    setRadiusGeoPoint(data.radiusFromCompany ? data.radiusFromCompany : "5000");
    setStartEmployeWork(data.startEmployeWork ? data.startEmployeWork : "");
    setEndEmployeWork(data.endEmployeWork ? data.endEmployeWork : "");
    setConsiderTimeByTrafic(data.considerMinimalTimeByTraffic ? true : false);
    setFuelPrice(data.fuelPrice ? data.fuelPrice : "");
    setVehicules(data.vehicles ? data.vehicles : []);
    setPlanningDate(
      data.planningDate ? new Date(data.planningDate) : new Date()
    );
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <Header />
      <div
        style={{
          width: "100%",
          marginTop: 1,
          height: "calc(100vh - 104px)",
          display: "flex"
        }}
      >
        <div
          style={{
            flex: 2,
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto"
          }}
        >
          <div style={{ display: "block", padding: 20 }}>
            <div>
              <p>Exemple de cas : </p>
              <select
                className="select-input"
                onChange={onChangeSample}
                placeholder="Exemple"
              >
                <option value="">choisir...</option>
                <option value="transport-etech-test">
                  Transport-etech-test
                </option>
              </select>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <p>Nom de la compagnie : </p>
              </div>
              <div style={{ display: "block" }}>
                <input
                  style={{ marginTop: 15 }}
                  type="text"
                  placeholder="nom de la compagnie ..."
                  value={companyInfo.adresse ? companyInfo.adresse : ""}
                />
                <input
                  style={{ marginTop: 15 }}
                  type="text"
                  placeholder="Latitude ..."
                  value={companyInfo.latitude ? companyInfo.latitude : ""}
                />
                <input
                  style={{ marginTop: 15 }}
                  type="text"
                  placeholder="Longitude ..."
                  value={companyInfo.longitude ? companyInfo.longitude : ""}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <p>
                  Rayon à vol d'oiseau pour generer les GeoPoint (en metre) :{" "}
                </p>
              </div>
              <div style={{ dipsplay: "block" }}>
                <input
                  style={{ marginTop: 15, marginLeft: 20 }}
                  type="text"
                  placeholder="rayon en metre..."
                  value={radiusGeoPoint}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <p>Date de plannification : </p>
              </div>
              <div style={{ dipsplay: "block" }}>
                <input
                  value={dateToYMD(planningDate)}
                  style={{ marginTop: 15, marginLeft: 20 }}
                  type="date"
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <p>*Entrer du personnel à : </p>
              </div>
              <div style={{ dipsplay: "block" }}>
                <input
                  style={{ marginTop: 15, marginLeft: 20 }}
                  type="time"
                  placeholder="hh:mm:ss"
                  value={startEmployeWork}
                />
              </div>
              <div style={{ marginLeft: 35 }}>
                <p>- *Sortie à : </p>
              </div>
              <div style={{ dipsplay: "block" }}>
                <input
                  style={{ marginTop: 15 }}
                  type="time"
                  placeholder="hh:mm:ss"
                  value={endEmployeWork}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <p>Considerer le temps optimal de trajet par : </p>
              </div>
              <div style={{ dipsplay: "block" }}>
                <input
                  style={{ marginTop: 15, marginLeft: 20 }}
                  type="checkbox"
                  title="traffic"
                  checked={considerTimeByTrafic}
                />
                <span>Traffic </span>
              </div>
              <div style={{ dipsplay: "block" }}>
                <input
                  style={{ marginTop: 15, marginLeft: 20 }}
                  type="checkbox"
                  title="cout par heure"
                  checked={!considerTimeByTrafic}
                />
                <span>cout par heure</span>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <p>Prix unitaire de carburant : </p>
              </div>
              <div style={{ dipsplay: "block" }}>
                <input
                  style={{ marginTop: 15, marginLeft: 20 }}
                  type="text"
                  placeholder="prix du carburant"
                  value={fuelPrice}
                />
                <span> / litre</span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 2,
            overflow: "auto",
            borderLeftStyle: "solid",
            borderLeftWidth: 2,
            borderLeftColor: "#ccc"
          }}
        >
          <div style={{ display: "block", padding: 20 }}>
            <p>
              Liste des vehicules de transport :{" "}
              <input
                type="number"
                style={{ marginBottom: 10 }}
                placeholder="nombre"
              />{" "}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="text-color-green">Generer</button>{" "}
                <button>Ajouter</button>{" "}
                <button className="text-color-red">Effacer</button>
              </div>
            </p>
            {vehicules.map((value, idx) => {
              return <VehiculesInputs item={value} />;
            })}
          </div>
        </div>
        <div
          style={{
            flex: 2,
            overflow: "auto",
            borderLeftStyle: "solid",
            borderLeftWidth: 2,
            borderLeftColor: "#ccc"
          }}
        >
          <div style={{ display: "block", padding: 20 }}>
            <p>
              Liste des shipments :{" "}
              <input
                style={{ marginBottom: 10 }}
                type="number"
                placeholder="nombre"
              />{" "}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="text-color-green">Generer</button>{" "}
                <button>Ajouter</button>{" "}
                <button className="text-color-red">Effacer</button>
              </div>
            </p>
            <ShipmentsInputs />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "auto",
            borderLeftStyle: "solid",
            borderLeftWidth: 2,
            borderLeftColor: "#ccc"
          }}
        >
          <div style={{ display: "block", padding: 20 }}>
            <p>
              Point à trafic dense :{" "}
              <div
                style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-between"
                }}
              >
                <button>Ajouter</button>{" "}
                <button className="text-color-red">Effacer</button>
              </div>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
