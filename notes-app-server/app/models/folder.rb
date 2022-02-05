class Folder < ActiveRecord::Base
  has_many :notes

  def self.sort_by_oldest
      self.order(:created_at)
  end

  def self.sort_by_newest
      self.sort_by_oldest.reverse_order
  end

  def self.oldest
      self.sort_by_oldest.first
  end

  def self.newest
      self.sort_by_newest.first
  end

  def self.recently_changed
      self.order(:updated_at).reverse_order
  end
  
end