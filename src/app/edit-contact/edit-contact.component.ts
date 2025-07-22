import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  firstName = new FormControl('firstName');
  lastName = new FormControl();
  dateOfBirth = new FormControl();
  favouritesRanking = new FormControl();

  constructor(private route: ActivatedRoute, private contactsService: ContactsService) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe(contact => {
      if (contact) {
        this.firstName.setValue(contact.firstName);
        this.lastName.setValue(contact.lastName);
        this.dateOfBirth.setValue(contact.dateOfBirth ? contact.dateOfBirth.toISOString().split('T')[0] : '');
        this.favouritesRanking.setValue(contact.favoritesRanking);
      }
    });
  }

  saveContact() {
    console.log(this.firstName.value);
    console.log(this.lastName.value);
    console.log(this.dateOfBirth.value);
    console.log(this.favouritesRanking.value);
  }
}
