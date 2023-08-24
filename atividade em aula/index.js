const iniciar = document.getElementById("iniciar");
iniciar.addEventListener("click", () => {
  let nivelJogo = document.getElementById("nivelJogo").value;
  window.location.href = "jogo.html?" + nivelJogo;
});