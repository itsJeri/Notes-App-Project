class Note < ActiveRecord::Base
  belongs_to :folder
  has_many :note_tags
  has_many :tags, through: :note_tags

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