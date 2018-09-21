<template>
  <div id="app">
    <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">FGO Noble Phantasm Damage Simulator</h1>
          <h2 class="subtitle">Unofficial Simulator for Fate / Grand Order</h2>
        </div>
      </div>
    </section>

    <NoblePhantasm/>

    <footer class="footer">
      <div class="content has-text-centered">
      </div>
    </footer>
  </div>
</template>

<script>
import NoblePhantasm from '@/components/NoblePhantasm'

export default {
  name: 'app',
  components: {
    NoblePhantasm
  }
}
</script>
