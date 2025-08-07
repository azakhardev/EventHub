package cz.zakharchenkoartem.eventhub.restapi.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import cz.zakharchenkoartem.eventhub.restapi.dto.Views;
import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @JsonView(Views.Public.class)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonView(Views.Public.class)
    @NotBlank
    private String username;

    @JsonIgnore
    @Size(min = 4, max = 100)
    private String password;

    @JsonView(Views.Public.class)
    @NotBlank
    private String nickname;

    @JsonView(Views.Public.class)
    private String profilePictureUrl;

    @JsonView(Views.Public.class)
    private String proffesion;

    @JsonView(Views.Public.class)
    @Email
    private String email;

    @JsonView(Views.Public.class)
    @Column(columnDefinition = "TEXT")
    private String about;

    @JsonView(Views.Owner.class)
    @Column(name = "follow_token", columnDefinition = "UUID DEFAULT gen_random_uuid()")
    private UUID followToken;

    @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Event> events;

    public User() {

    }

    public User(Long id, String username, String password, String nickname, String email, String about, String profilePictureUrl, String proffesion) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
        this.about = about;
        this.profilePictureUrl = profilePictureUrl;
        this.proffesion = proffesion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfile_picture_url() {
        return profilePictureUrl;
    }

    public void setProfile_picture_url(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public String getProffesion() {
        return proffesion;
    }

    public void setProffesion(String proffesion) {
        this.proffesion = proffesion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public UUID getFollowToken() {
        return followToken;
    }

    public void setFollowToken(UUID followToken) {
        this.followToken = followToken;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", nickname='" + nickname + '\'' +
                ", profilePictureUrl='" + profilePictureUrl + '\'' +
                ", proffesion='" + proffesion + '\'' +
                ", email='" + email + '\'' +
                ", about='" + about + '\'' +
                ", followToken=" + followToken +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(nickname, user.nickname) && Objects.equals(profilePictureUrl, user.profilePictureUrl) && Objects.equals(proffesion, user.proffesion) && Objects.equals(email, user.email) && Objects.equals(about, user.about) && Objects.equals(followToken, user.followToken) && Objects.equals(events, user.events);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, nickname, profilePictureUrl, proffesion, email, about, followToken, events);
    }
}
