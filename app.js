const STORAGE_KEY = "sanfran_api_base_url";

const configForm = document.getElementById("config-form");
const apiBaseUrlInput = document.getElementById("apiBaseUrl");
const statusEl = document.getElementById("status");
const refreshUsersBtn = document.getElementById("refresh-users");
const userForm = document.getElementById("user-form");
const userQueryForm = document.getElementById("user-query-form");
const userDeleteForm = document.getElementById("user-delete-form");
const usersTbody = document.getElementById("users-tbody");
const refreshFacilitiesBtn = document.getElementById("refresh-facilities");
const facilityForm = document.getElementById("facility-form");
const facilityQueryForm = document.getElementById("facility-query-form");
const facilityDeleteForm = document.getElementById("facility-delete-form");
const facilitiesTbody = document.getElementById("facilities-tbody");
const refreshReservationsBtn = document.getElementById("refresh-reservations");
const reservationForm = document.getElementById("reservation-form");
const reservationQueryForm = document.getElementById("reservation-query-form");
const reservationDeleteForm = document.getElementById("reservation-delete-form");
const reservationsTbody = document.getElementById("reservations-tbody");

init();

function init() {
  const savedUrl = localStorage.getItem(STORAGE_KEY) || "http://localhost:8080/api/v1";
  apiBaseUrlInput.value = savedUrl;

  configForm.addEventListener("submit", handleSaveConfig);
  refreshUsersBtn.addEventListener("click", () => void loadUsers());
  refreshFacilitiesBtn.addEventListener("click", () => void loadFacilities());
  refreshReservationsBtn.addEventListener("click", () => void loadReservations());
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void createUser();
  });
  userQueryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void searchUsers();
  });
  userDeleteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void deleteUserByQuery();
  });

  facilityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void createFacility();
  });
  facilityQueryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void searchFacilities();
  });
  facilityDeleteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void deleteFacilityByQuery();
  });

  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void createReservation();
  });
  reservationQueryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void searchReservations();
  });
  reservationDeleteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void deleteReservationByQuery();
  });

  void loadAll();
}

function getBaseUrl() {
  return apiBaseUrlInput.value.trim().replace(/\/$/, "");
}

function setStatus(message, type = "") {
  statusEl.className = "status";
  if (type) {
    statusEl.classList.add(type);
  }
  statusEl.textContent = message;
}

function handleSaveConfig(event) {
  event.preventDefault();
  if (!apiBaseUrlInput.checkValidity()) {
    setStatus("La URL base no es válida.", "error");
    apiBaseUrlInput.focus();
    return;
  }

  localStorage.setItem(STORAGE_KEY, getBaseUrl());
  setStatus("URL base guardada correctamente.", "ok");
  void loadAll();
}

async function loadAll() {
  await Promise.all([loadUsers(), loadFacilities(), loadReservations()]);
}

async function loadUsers(query = {}) {
  setStatus("Consultando usuarios...");

  try {
    const data = await apiRequest("/users", { method: "GET", query }, "No fue posible consultar usuarios.");
    const users = ensureArray(data);
    renderUsers(users);
    setStatus(`Consulta exitosa. ${users.length} usuario(s) cargado(s).`, "ok");
  } catch (error) {
    renderUsers([]);
    setStatus(getErrorMessage(error), "error");
  }
}

async function createUser() {
  if (!userForm.checkValidity()) {
    userForm.reportValidity();
    setStatus("Completa los campos requeridos para crear el usuario.", "error");
    return;
  }

  const payload = {
    names: getValue("names"),
    idDocument: getValue("idDocument"),
    email: getValue("email"),
    password: getValue("password"),
    role: getValue("role"),
    subRole: getValue("subRole")
  };

  setStatus("Creando usuario...");

  try {
    await apiRequest("/users", { method: "POST", body: payload }, "No fue posible crear el usuario.");

    userForm.reset();
    setStatus("Usuario creado correctamente.", "ok");
    await loadUsers();
  } catch (error) {
    setStatus(getErrorMessage(error), "error");
  }
}

async function searchUsers() {
  const queryType = getValue("userQueryType");
  const queryValue = getValue("userQueryValue");
  if (queryType === "all") {
    await loadUsers();
    return;
  }

  if (!queryValue) {
    setStatus("Ingresa un valor para buscar usuarios.", "error");
    return;
  }

  await loadUsers({ [queryType]: queryValue });
}

async function deleteUserByQuery() {
  if (!userDeleteForm.checkValidity()) {
    userDeleteForm.reportValidity();
    return;
  }

  const key = getValue("userDeleteType");
  const value = getValue("userDeleteValue");
  setStatus("Eliminando usuario...");
  try {
    await apiRequest("/users", { method: "DELETE", query: { [key]: value } }, "No fue posible eliminar el usuario.");
    setStatus("Usuario eliminado correctamente.", "ok");
    userDeleteForm.reset();
    await loadUsers();
  } catch (error) {
    setStatus(getErrorMessage(error), "error");
  }
}

async function loadFacilities(query = {}) {
  setStatus("Consultando facilities...");
  try {
    const data = await apiRequest("/facilities", { method: "GET", query }, "No fue posible consultar facilities.");
    const facilities = ensureArray(data);
    renderFacilities(facilities);
    setStatus(`Consulta exitosa. ${facilities.length} facility(s) cargada(s).`, "ok");
  } catch (error) {
    renderFacilities([]);
    setStatus(getErrorMessage(error), "error");
  }
}

async function createFacility() {
  if (!facilityForm.checkValidity()) {
    facilityForm.reportValidity();
    setStatus("Completa los campos requeridos para crear la facility.", "error");
    return;
  }

  const payload = {
    name: getValue("facilityName"),
    description: getValue("facilityDescription"),
    imageUrl: getValue("facilityImageUrl"),
    capacity: Number(getValue("facilityCapacity"))
  };

  setStatus("Creando facility...");
  try {
    await apiRequest("/facilities", { method: "POST", body: payload }, "No fue posible crear la facility.");
    facilityForm.reset();
    setStatus("Facility creada correctamente.", "ok");
    await loadFacilities();
  } catch (error) {
    setStatus(getErrorMessage(error), "error");
  }
}

async function searchFacilities() {
  const queryType = getValue("facilityQueryType");
  const queryValue = getValue("facilityQueryValue");
  if (queryType === "all") {
    await loadFacilities();
    return;
  }

  if (!queryValue) {
    setStatus("Ingresa un valor para buscar facilities.", "error");
    return;
  }

  await loadFacilities({ [queryType]: queryValue });
}

async function deleteFacilityByQuery() {
  if (!facilityDeleteForm.checkValidity()) {
    facilityDeleteForm.reportValidity();
    return;
  }

  const key = getValue("facilityDeleteType");
  const value = getValue("facilityDeleteValue");
  setStatus("Eliminando facility...");
  try {
    await apiRequest("/facilities", { method: "DELETE", query: { [key]: value } }, "No fue posible eliminar la facility.");
    setStatus("Facility eliminada correctamente.", "ok");
    facilityDeleteForm.reset();
    await loadFacilities();
  } catch (error) {
    setStatus(getErrorMessage(error), "error");
  }
}

async function loadReservations(query = {}) {
  setStatus("Consultando reservations...");
  try {
    const data = await apiRequest("/reservations", { method: "GET", query }, "No fue posible consultar reservations.");
    const reservations = ensureArray(data);
    renderReservations(reservations);
    setStatus(`Consulta exitosa. ${reservations.length} reservation(s) cargada(s).`, "ok");
  } catch (error) {
    renderReservations([]);
    setStatus(getErrorMessage(error), "error");
  }
}

async function createReservation() {
  if (!reservationForm.checkValidity()) {
    reservationForm.reportValidity();
    setStatus("Completa los campos requeridos para crear la reservation.", "error");
    return;
  }

  const payload = {
    userId: getValue("reservationUserId"),
    facilityId: getValue("reservationFacilityId"),
    date: getValue("reservationDate"),
    startTime: normalizeTime(getValue("reservationStartTime")),
    endTime: normalizeTime(getValue("reservationEndTime"))
  };

  setStatus("Creando reservation...");
  try {
    await apiRequest("/reservations", { method: "POST", body: payload }, "No fue posible crear la reservation.");
    reservationForm.reset();
    setStatus("Reservation creada correctamente.", "ok");
    await loadReservations();
  } catch (error) {
    setStatus(getErrorMessage(error), "error");
  }
}

async function searchReservations() {
  const queryType = getValue("reservationQueryType");
  const queryValue = getValue("reservationQueryValue");
  if (queryType === "all") {
    await loadReservations();
    return;
  }

  if (!queryValue) {
    setStatus("Ingresa un valor para buscar reservations.", "error");
    return;
  }

  await loadReservations({ [queryType]: queryValue });
}

async function deleteReservationByQuery() {
  if (!reservationDeleteForm.checkValidity()) {
    reservationDeleteForm.reportValidity();
    return;
  }

  const id = getValue("reservationDeleteValue");
  setStatus("Eliminando reservation...");
  try {
    await apiRequest("/reservations", { method: "DELETE", query: { id } }, "No fue posible eliminar la reservation.");
    setStatus("Reservation eliminada correctamente.", "ok");
    reservationDeleteForm.reset();
    await loadReservations();
  } catch (error) {
    setStatus(getErrorMessage(error), "error");
  }
}

function getValue(fieldId) {
  const element = document.getElementById(fieldId);
  return element.value.trim();
}

function renderUsers(users) {
  if (users.length === 0) {
    usersTbody.innerHTML = "<tr><td colspan=\"6\">Sin datos cargados.</td></tr>";
    return;
  }

  usersTbody.innerHTML = users
    .map((user) => {
      return `<tr>
        <td>${safeText(user.id)}</td>
        <td>${safeText(user.names)}</td>
        <td>${safeText(user.idDocument)}</td>
        <td>${safeText(user.email)}</td>
        <td>${safeText(user.role)}</td>
        <td>${safeText(user.subRole)}</td>
      </tr>`;
    })
    .join("");
}

function renderFacilities(facilities) {
  if (facilities.length === 0) {
    facilitiesTbody.innerHTML = "<tr><td colspan=\"4\">Sin datos cargados.</td></tr>";
    return;
  }

  facilitiesTbody.innerHTML = facilities
    .map(
      (facility) => `<tr>
        <td>${safeText(facility.id)}</td>
        <td>${safeText(facility.name)}</td>
        <td>${safeText(facility.description)}</td>
        <td>${safeText(facility.capacity)}</td>
      </tr>`
    )
    .join("");
}

function renderReservations(reservations) {
  if (reservations.length === 0) {
    reservationsTbody.innerHTML = "<tr><td colspan=\"6\">Sin datos cargados.</td></tr>";
    return;
  }

  reservationsTbody.innerHTML = reservations
    .map(
      (reservation) => `<tr>
        <td>${safeText(reservation.id)}</td>
        <td>${safeText(reservation.userId)}</td>
        <td>${safeText(reservation.facilityId)}</td>
        <td>${safeText(reservation.date)}</td>
        <td>${safeText(reservation.startTime)}</td>
        <td>${safeText(reservation.endTime)}</td>
      </tr>`
    )
    .join("");
}

function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function buildRequestError(response, fallbackMessage) {
  let payload;
  try {
    payload = await response.json();
  } catch {
    return new Error(`${fallbackMessage} (${response.status})`);
  }

  const data = payload?.data;
  const detail =
    data?.message ||
    data?.error ||
    data?.details ||
    (Array.isArray(data?.details) ? data.details.join(", ") : "") ||
    payload?.message ||
    payload?.error ||
    payload?.details;

  if (detail) {
    return new Error(`${fallbackMessage} (${response.status}) ${detail || ""}`.trim());
  }

  return new Error(`${fallbackMessage} (${response.status})`);
}

function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Ocurrió un error inesperado.";
}

async function apiRequest(path, options, fallbackErrorMessage) {
  const requestUrl = buildRequestUrl(path, options.query ?? {});
  const response = await fetch(requestUrl, {
    method: options.method,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {})
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {})
  });

  if (!response.ok) {
    throw await buildRequestError(response, fallbackErrorMessage);
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    const payload = JSON.parse(text);
    return payload?.data ?? null;
  } catch {
    return null;
  }
}

function buildRequestUrl(path, query) {
  const url = new URL(`${getBaseUrl()}${path}`);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== null && value !== undefined && String(value).trim() !== "") {
      url.searchParams.set(key, String(value).trim());
    }
  });
  return url.toString();
}

function ensureArray(data) {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && typeof data === "object") {
    return [data];
  }
  return [];
}

function normalizeTime(value) {
  return value.length === 5 ? `${value}:00` : value;
}
