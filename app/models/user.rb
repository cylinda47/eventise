class User < ApplicationRecord
    validates :firstname, :lastname, :password_digest, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, length: { minimum: 8, allow_nil: true }
    after_initialize :ensure_session_token

    attr_reader :password

    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
      self.session_token ||= SecureRandom.urlsafe_base64(16)
    end

    def reset_session_token!
      self.session_token = SecureRandom.urlsafe_base64(16)
      self.save!
      self.session_token
    end

    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      user && BCrypt::Password.new(user.password_digest).is_password?(password) ? user : nil
    end
end