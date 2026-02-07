<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Book } from '../../types';

  export let book: Book;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('select', { book });
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'AVAILABLE':
        return '#28a745';
      case 'BORROWED':
        return '#dc3545';
      case 'RESERVED':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  }

  function getDisplayTitle(title: string): string {
    return title.length > 50 ? title.substring(0, 50) + '...' : title;
  }
</script>

<div 
  class="book-card"
  on:click={handleClick}
  on:keypress={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
>
  <div class="book-header">
    <h3>{getDisplayTitle(book.title)}</h3>
    <span 
      class="status-badge"
      style="background-color: {getStatusColor(book.status)}"
    >
      {book.status}
    </span>
  </div>
  
  <p class="author">by {book.author}</p>
  
  {#if book.description}
    <p class="description">
      {book.description.length > 100 
        ? book.description.substring(0, 100) + '...' 
        : book.description}
    </p>
  {/if}
  
  <div class="book-footer">
    <span class="genre">{book.genre}</span>
    {#if book.publishedYear}
      <span class="year">{book.publishedYear}</span>
    {/if}
  </div>
</div>

<style>
  .book-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #e5e7eb;
  }
  
  .book-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .book-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  
  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #1f2937;
    flex: 1;
    font-weight: 600;
  }
  
  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    white-space: nowrap;
  }
  
  .author {
    color: #6b7280;
    margin: 0 0 0.5rem 0;
    font-style: italic;
    font-size: 0.9rem;
  }
  
  .description {
    color: #4b5563;
    font-size: 0.9rem;
    margin: 0 0 1rem 0;
    line-height: 1.5;
  }
  
  .book-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .genre {
    background: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 500;
  }
  
  .year {
    color: #9ca3af;
    font-size: 0.85rem;
  }
</style>
