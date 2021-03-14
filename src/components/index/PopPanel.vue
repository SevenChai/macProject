<template>
  <ul
    :class="{ 'pop-ul': true, 'is-list': type == 'list-inline' ? true : false }"
  >
    <li
      v-for="dt in data"
      :key="dt[idStr]"
      :[idStr]="dt[idStr]"
      class="inline-card"
    >
      <div v-if="type == 'icon-inline'">
        <h3 class="title">{{ dt.title }}</h3>
        <p class="small-desc">{{ dt.desc }}</p>
      </div>
      <div v-else-if="type == 'list-inline'">
        <p>
          <i class="diamond-icon"></i><span>{{ dt.title }}</span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      default: "list-inline",
    },
    idStr: {
      type: String,
      default: "id",
    },
  },
};
</script>

<style lang="scss" scoped>
.pop-ul {
  width: 180px;  
  margin: 0;
  padding: 10px 0;
  li {
    list-style-type: none;
    padding: 5px 0 5px;
    h3,
    p {
      margin: 0;
      padding: 0;
    }
    .title {
      font-weight: bold;
      font-size: 18px;
    }
    .small-desc {
      font-size: 12px;
      color: #888;
    }
  }
}
.is-list {
  li {
    span,
    i {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    i.diamond-icon {
      width: 6px;
      height: 6px;
      background-color: red;
      transform: rotateZ(45deg);
    }
  }
}
</style>