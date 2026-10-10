// BUILD_TIME and COMMIT_SHA are replaced by the GitHub Actions build step.
const BUILD_TIME = "__BUILD_TIME__";
const COMMIT_SHA = "__COMMIT_SHA__";

document.addEventListener("DOMContentLoaded", () => {
  const info = document.getElementById("build-info");
  if (info && !BUILD_TIME.startsWith("__")) {
    info.textContent = `Build: ${COMMIT_SHA.slice(0, 7)} at ${BUILD_TIME}`;
  }
});
