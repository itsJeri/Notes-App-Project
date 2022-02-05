class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # HOME #
  get '/' do
    "Welcome! You can view data through these endpoints:
    /folders
    /notes"
  end


  # FOLDERS #
  get '/folders' do # return all
    folders = Folder.all.reverse
    folders.to_json
  end

  # get '/folders/all/recent' do # return all
  #   folders = Folder.all.recently_changed
  #   folders.to_json
  # end

  # get '/folders/:id' do # return by ID
  #   folder = Folder.find(params[:id])
  #   folder.to_json
  # end

  post '/folders' do # create new
    folder = Folder.create(
      id: params[:id],
      name: params[:name],
      created_at: params[:created_at],
      updated_at: params[:updated_at]
      )
    folder.to_json
  end

  patch '/folders/:id' do # rename
    folder = Folder.find(params[:id])
    folder.update(
      name: params[:name],
      updated_at: params[:updated_at]
      )
    folder.to_json
  end

  delete '/folders/:id' do # delete folder only
    folder = Folder.find(params[:id])
    folder.destroy
  end


  # NOTES #
  get '/notes' do # return all
    notes = Note.all
    notes.to_json
  end

  # get '/notes/:id' do # return by ID
  #   note = Note.find(params[:id])
  #   note.to_json
  # end

  post '/notes' do # create new
    note = Note.create(
      id: params[:id],
      title: params[:title],
      body: params[:body],
      created_at: params[:created_at],
      updated_at: params[:updated_at],
      folder_id: params[:folder_id]
    )
    note.to_json
  end

  patch '/notes/:id' do # update note body
    note = Note.find(params[:id])
    note.update(
      title: params[:title],
      body: params[:body],
      updated_at: params[:updated_at]
    )
    note.to_json
  end

  delete '/notes/:id' do # delete
    note = Note.find(params[:id])
    note.destroy
  end

  # TAGS
  get '/tags' do #return all
    tags = Tag.all
    tags.to_json
  end

  post '/tags' do # create new
    tag = Tag.create(
      id: params[:id],
      name: params[:name]
    )
    tag.to_json
  end

  patch '/tags/:id' do # update tag name
    tag = Tag.find(params[:id])
    tag.update(
      name: params[:name]
    )
    tag.to_json
  end

  delete '/tags/:id' do # ***delete tag from entire library***
    tag = Tag.find(params[:id])
    tag.destroy
  end


  # NOTE_TAGS JOIN TABLE
  post '/notes/:note_id/tags/:tag_name' do # create new tag on note
    note = Note.find(params[:note_id])
    tag = Tag.create(
      id: UUID.new.generate, 
      name: params[:tag_name]
    )
    add_tag = note.tags << tag
    add_tag.to_json
  end

  patch '/notes/:note_id/tags/:tag_id/add' do # add new tag on note
    note = Note.find(params[:note_id])
    tag = Tag.find(params[:tag_id])
    add_tag = note.tags << tag
    add_tag.to_json
  end

  patch '/notes/:note_id/tags/:tag_id/remove' do # remove tag on note
    note = Note.find(params[:note_id])
    tag = Tag.find(params[:tag_id])
    remove_tag = note.tags.delete(tag)
    remove_tag.to_json
  end

  # NOTES/TAGS
  get '/notes/all/tags' do # return all notes with tags
    notes = Note.all
    notes.to_json(include: :tags)
  end

  get '/tags/all/notes' do # return tags with their notes
    tags = Tag.all
    tags.to_json(include: :notes)
  end


  # FOLDERS/NOTES
  get '/folders/all/notes' do # return folders with their notes
    folders = Folder.all
    folders.to_json(include: :notes)
  end

  patch '/folders/notes/:id' do # update note's folder
    note = Note.find(params[:id])
    note.update(
      folder_id: params[:folder_id],
      updated_at: params[:updated_at]
    )
    note.to_json
  end

  delete '/folders/notes/:id' do # delete folder with contained notes
    notes = Note.where('folder_id = ?', params[:id])
    folder = Folder.find(params[:id])
    notes.destroy_all
    folder.destroy
  end

end
