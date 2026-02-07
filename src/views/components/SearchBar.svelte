<script lang="ts">
  export let value = '';
  export let placeholder = 'Search...';
  export let onSearch: (query: string) => void;

  let timeout: ReturnType<typeof setTimeout>;

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    
    // Debounce search
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onSearch(value);
    }, 300);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      clearTimeout(timeout);
      onSearch(value);
    }
  }

  function clearSearch() {
    value = '';
    onSearch('');
  }
</script>

<div class="search-bar">
  <div class="search-input-wrapper">
    <span class="search-icon">🔍</span>
    <input
      type="text"
      {value}
      {placeholder}
      on:input={handleInput}
      on:keydown={handleKeydown}
      class="search-input"
    />
    {#if value}
      <button 
        class="clear-button"
        on:click={clearSearch}
        aria-label="Clear search"
      >
        ✕
      </button>
    {/if}
  </div>
</div>

<style>
  .search-bar {
    width: 100%;
    max-width: 600px;
  }
  
  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .search-icon {
    position: absolute;
    left: 1rem;
    color: #9ca3af;
    font-size: 1rem;
  }
  
  .search-input {
    width: 100%;
    padding: 0.75rem 3rem 0.75rem 3rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  
  .search-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .search-input::placeholder {
    color: #9ca3af;
  }
  
  .clear-button {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s, color 0.2s;
  }
  
  .clear-button:hover {
    background-color: #f3f4f6;
    color: #6b7280;
  }
</style>
