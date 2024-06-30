import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  Alpine.data('postSearch', () => ({
    loading: false,
    failed: false,
    searched: false,
    query: '',
    lastQuery: '',
    submit() {
      if (this.query === this.lastQuery) return;

      this.loading = true;
      this.failed = false;
      this.query = this.query.trim();
      this.lastQuery = this.query;

      fetch('/posts', { method: 'POST', body: new FormData(this.$el as HTMLFormElement) })
        .then(async (response) => {
          const current = this.$refs.partial as HTMLElement;
          const next = new DOMParser().parseFromString(await response.text(), 'text/html');
          current.replaceWith(next.querySelector('[x-ref="partial"]') as typeof current);
        })
        .catch(() => ((this.failed = true), (this.searched = true)))
        .finally(() => ((this.loading = false), (this.searched = true)));
    },
    reset() {
      this.loading = false;
      this.failed = false;
      this.searched = false;
      this.lastQuery = '';
    },
  }));
};
