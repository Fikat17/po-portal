const supabaseUrl = 'https://ttuygsqmxfmuuaogocwb.supabase.co/rest/v1/';
const supabaseKey = 'ttuygsqmxfmuuaogocwb';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    document.getElementById('message').innerText = error.message;
  } else {
    window.location.href = 'dashboard.html';
  }
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

async function loadPOs() {
  const container = document.getElementById('po-list');
  if (!container) return;

  const { data, error } = await supabase
    .from('purchase_orders')
    .select('*')
    .order('upload_date', { ascending: false });

  if (error) {
    container.innerHTML = `<p>${error.message}</p>`;
    return;
  }

  container.innerHTML = '';

  data.forEach(po => {
    const item = document.createElement('div');
    item.className = 'po-item';
    item.innerHTML = `
      <h3>PO ${po.po_number}</h3>
      <p>Tanggal Upload: ${new Date(po.upload_date).toLocaleString()}</p>
      <a href="${po.file_url}" target="_blank">Download PDF</a>
    `;
    container.appendChild(item);
  });
}

window.onload = loadPOs;