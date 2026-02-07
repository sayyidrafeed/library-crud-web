<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Member } from '../../types';

  export let member: Member;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('select', { member });
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return '#10b981';
      case 'SUSPENDED':
        return '#ef4444';
      case 'INACTIVE':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  }

  function getDisplayName(name: string): string {
    return name.length > 30 ? name.substring(0, 30) + '...' : name;
  }

  function getLoanCapacityColor(percentage: number): string {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 70) return '#f59e0b';
    return '#10b981';
  }
</script>

<div 
  class="member-card"
  on:click={handleClick}
  on:keypress={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
>
  <div class="member-header">
    <div class="member-info">
      <h3>{getDisplayName(member.name)}</h3>
      <p class="email">{member.email}</p>
    </div>
    <span 
      class="status-badge"
      style="background-color: {getStatusColor(member.status)}"
    >
      {member.status}
    </span>
  </div>
  
  <div class="loan-info">
    <div class="loan-capacity">
      <span class="loan-label">Loans:</span>
      <span class="loan-count">{member.currentLoans} / {member.currentLoans + member.remainingCapacity}</span>
    </div>
    <div class="loan-progress">
      <div 
        class="progress-bar"
        style="width: {member.currentLoans / (member.currentLoans + member.remainingCapacity) * 100}%; background-color: {getLoanCapacityColor(member.currentLoans / (member.currentLoans + member.remainingCapacity) * 100)}"
      ></div>
    </div>
  </div>
  
  {#if member.phone}
    <p class="contact-info">📞 {member.phone}</p>
  {/if}
  
  {#if member.address}
    <p class="contact-info">📍 {member.address.length > 50 ? member.address.substring(0, 50) + '...' : member.address}</p>
  {/if}
</div>

<style>
  .member-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #e5e7eb;
  }
  
  .member-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .member-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .member-info {
    flex: 1;
  }
  
  h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
    color: #1f2937;
    font-weight: 600;
  }
  
  .email {
    color: #6b7280;
    margin: 0;
    font-size: 0.9rem;
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
  
  .loan-info {
    margin-bottom: 1rem;
  }
  
  .loan-capacity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .loan-label {
    font-size: 0.85rem;
    color: #6b7280;
    font-weight: 500;
  }
  
  .loan-count {
    font-size: 0.9rem;
    color: #1f2937;
    font-weight: 600;
  }
  
  .loan-progress {
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    transition: width 0.3s ease;
  }
  
  .contact-info {
    color: #6b7280;
    margin: 0.5rem 0 0 0;
    font-size: 0.85rem;
  }
</style>
