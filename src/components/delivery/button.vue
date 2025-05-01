<template>
  <div class="container">
    <div class="left">
      <img :src="imageSrc" alt="Image" />
      <div class="name">{{ name }}</div>
    </div>
    <div class="next">
      <svg
        width="65"
        height="65"
        viewBox="0 0 65 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.12597 32.5004C8.12597 33.5779 8.55398 34.6112 9.31585 35.373C10.0777 36.1349 11.111 36.5629 12.1885 36.5629H44.3635L33.6926 47.2338C32.975 48.0039 32.5844 49.0225 32.6029 50.0749C32.6215 51.1274 33.0479 52.1316 33.7922 52.8759C34.5365 53.6202 35.5407 54.0466 36.5931 54.0651C37.6456 54.0837 38.6642 53.693 39.4343 52.9754L57.0385 35.3713C57.7992 34.6095 58.2266 33.577 58.2266 32.5004C58.2266 31.4239 57.7992 30.3913 57.0385 29.6296L39.4343 12.0254C39.0624 11.6263 38.6139 11.3062 38.1156 11.0841C37.6172 10.8621 37.0793 10.7427 36.5338 10.7331C35.9883 10.7234 35.4465 10.8238 34.9406 11.0281C34.4348 11.2324 33.9753 11.5365 33.5895 11.9223C33.2037 12.3081 32.8996 12.7676 32.6953 13.2734C32.491 13.7793 32.3906 14.3211 32.4003 14.8666C32.4099 15.4121 32.5293 15.95 32.7513 16.4483C32.9734 16.9467 33.2935 17.3952 33.6926 17.7671L44.3635 28.4379L12.1885 28.4379C9.94597 28.4379 8.12597 30.2579 8.12597 32.5004Z"
          fill="#9A0404"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    name: { type: String, default: "" },
    imageSrc: { type: String, default: "" },
  },
};
</script>

<style scoped>
.container {
  width: fit-content;
  display: flex;
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  color: #292929;
  cursor: pointer;
  border: 1px solid #9a0404;

  font-weight: 700;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 640px;
  height: 210px;
}
.left {
  display: flex;
  align-items: center;
  gap: 30px;
}
img {
  width: 180px;
  height: 180px;
  border-radius: 20px;
}

.name {
  width: 300px;
  font-size: 32px;
}

.next:hover {
  transform: scale(1.1);
}
</style>
